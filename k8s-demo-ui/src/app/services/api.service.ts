import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor() { }

  async getTimezone() {
    const response = await axios.get(`${this.baseUrl}/system/timezone`);
    return response.data;
  }

  async getSecrets() {
    const response = await axios.get(`${this.baseUrl}/system/secrets`);
    return response.data;
  }

  async createFile(fileData: any) {
    const response = await axios.post(`${this.baseUrl}/system/files`, fileData);
    return response.data;
  }

  async getFiles() {
    const response = await axios.get(`${this.baseUrl}/system/files`);
    return response.data;
  }

  async healthCheck() {
    const response = await axios.get(`${this.baseUrl}/system/health`);
    return response.data;
  }

  async readinessCheck() {
    const response = await axios.get(`${this.baseUrl}/system/ready`);
    return response.data;
  }
}