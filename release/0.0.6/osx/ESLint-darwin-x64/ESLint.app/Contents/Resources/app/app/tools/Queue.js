import EventEmitter from 'events';

export default class Queue extends EventEmitter {
  static running = false;

  static limit = 5;

  static queue = [];

  static push(promise) {
    this.queue.push(promise);
    if (!this.running) {
      this.resume();
    }
  }

  static async resume() {
    if (this.queue.length) {
      this.running = true;
      await Promise.all(
        this.queue
          .filter((item, index) => index < this.limit)
          .map((item) => item()),
      );
      this.queue = this.queue.filter((item, index) => index >= this.limit);
      this.running = false;
      await this.resume();
    }
  }
}
