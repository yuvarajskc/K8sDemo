import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://scaling-carnival-rp4prprvj96fxrv7-5251.app.github.dev/api';

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