class Interval {
    private interval: NodeJS.Timer | null;
    private tasks: Record<string, { callback: any; time?: number }>;

    constructor() {
        this.interval = null;
        this.tasks = {};
    }

    create() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                Object.keys(this.tasks).forEach((key) => {
                    const task = this.tasks[key];
                    if (!task) {
                        delete this.tasks[key];
                    }

                    if (task.time !== undefined && task.time > 0) {
                        task.time--;
                    } else {
                        task.callback();
                    }
                });
            }, 1000);
        }
    }

    append(key: string, callback: () => void, time?: number) {
        if (time) {
            this.tasks[key] = { callback, time };
        } else {
            this.tasks[key] = { callback };
        }
        this.create();
    }

    remove(key: string) {
        if (this.tasks[key]) {
            delete this.tasks[key];
        }
    }

    clear() {
        this.tasks = {};
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

export default new Interval();
