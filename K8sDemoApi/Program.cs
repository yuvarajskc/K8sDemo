using K8sDemoApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Add CORS policy to allow localhost:4200
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowKubernetes", policy =>
    {
        policy.WithOrigins(
                "http://k8s-demo-ui",         // Kubernetes service name
                "http://localhost:4200"       // For local development
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use the CORS policy
app.UseCors("AllowKubernetes");

app.UseAuthorization();
app.MapControllers();

app.Run();