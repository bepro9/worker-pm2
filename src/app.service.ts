import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { workerThreadFilePath } from './worker/config';

@Injectable()
export class AppService {
  async worker(cpuTimeMs: number) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerThreadFilePath, {
        workerData: {
          cpuTimeMs,
        },
      });
      worker.on('message', (message) => {
        console.log('Main thread got message :', message);
        resolve(message);
      });

      worker.on('error', (error) => {
        console.log('Worker threw error :', error);
        reject(error);
      });

      worker.on('exit', (code) => {
        console.log('Worker exit with code :', code);
      });
    });
  }

  blocking(cpuTimeMs: number) {
    const startTime = Date.now();
    while (Date.now() - startTime < cpuTimeMs) {
      //blocking the main thread
    }
  }
}
