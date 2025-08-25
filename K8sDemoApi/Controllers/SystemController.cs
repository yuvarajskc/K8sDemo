using Microsoft.AspNetCore.Mvc;
using K8sDemoApi.Models;

namespace K8sDemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SystemController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public SystemController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        [HttpGet("timezone")]
        public IActionResult GetTimezone()
        {
            return Ok(new
            {
                Timezone = TimeZoneInfo.Local.StandardName,
                CurrentTime = DateTime.Now,
                ServerTime = DateTime.UtcNow
            });
        }

        [HttpGet("secrets")]
        public IActionResult GetSecrets()
        {
            var secretData = new SecretData
            {
                ApiKey = _configuration["SECRET_API_KEY"],
                DatabaseConnection = _configuration["DB_CONNECTION_STRING"]
            };

            return Ok(secretData);
        }

        [HttpPost("files")]
        public async Task<IActionResult> CreateFile([FromBody] FileData fileData)
        {
            var tempPath = Path.Combine(Path.GetTempPath(), "k8s-demo");
            Directory.CreateDirectory(tempPath);
            
            var filePath = Path.Combine(tempPath, fileData.FileName ?? $"file_{Guid.NewGuid()}.txt");
            await System.IO.File.WriteAllTextAsync(filePath, fileData.Content ?? "Default content");
            
            return Ok(new { FilePath = filePath, Message = "File created successfully" });
        }

        [HttpGet("files")]
        public IActionResult GetFiles()
        {
            var tempPath = Path.Combine(Path.GetTempPath(), "k8s-demo");
            if (!Directory.Exists(tempPath))
                return Ok(Array.Empty<string>());

            var files = Directory.GetFiles(tempPath);
            return Ok(files);
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            return Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow });
        }

        [HttpGet("ready")]
        public IActionResult ReadinessCheck()
        {
            // Simulate some startup logic
            return Ok(new { Status = "Ready", Timestamp = DateTime.UtcNow });
        }
    }
}