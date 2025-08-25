import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  timezoneData: any;
  secretData: any;
  files: any[] = [];
  healthStatus: any;
  readinessStatus: any;
  newFile = { fileName: '', content: '' };

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    try {
      this.timezoneData = await this.apiService.getTimezone();
      this.secretData = await this.apiService.getSecrets();
      this.files = await this.apiService.getFiles();
      this.healthStatus = await this.apiService.healthCheck();
      this.readinessStatus = await this.apiService.readinessCheck();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async createFile() {
    try {
      await this.apiService.createFile(this.newFile);
      this.newFile = { fileName: '', content: '' };
      await this.loadData();
    } catch (error) {
      console.error('Error creating file:', error);
    }
  }
}