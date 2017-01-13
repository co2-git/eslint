import drop from 'lodash/drop';
import take from 'lodash/take';

export default class Queue {
  static running = false;

  static limit = 5;

  static pause = 500;

  static queue = [];

  static push(...promises) {
    this.queue.push(...promises);
    if (!this.running) {
      this.resume();
    }
  }

  static resume() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.queue.length) {
          this.running = true;

          console.log('running queue', this.queue.length, this.limit);

          await Promise.all(
            take(this.queue, 5).map((item) => item()),
          );

          this.queue = drop(this.queue, 5);

          this.running = false;

          setTimeout(async () => {
            await this.resume();
            resolve();
          }, this.pause);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
