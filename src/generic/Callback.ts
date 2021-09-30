/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multi-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable wrap-iife */
import _ from 'underscore';

// https://github.com/jquery/jquery/blob/master/src/callbacks.js
// rewirte jquery.Callbacks to ts
// Topic need jquery callbacks
const rnothtmlwhite = new RegExp(/[^\x20\t\r\n\f]+/g);
export default class Callbacks {
  // Flag to know if list is currently firing
  private firing!: boolean;

  // Last fire value for non-forgettable lists
  private memory: any;

  // Flag to know if list was already fired
  private _fired!: boolean;

  // Flag to prevent firing
  private _locked!: boolean | any[];

  // Actual callback list
  private list: Array<(args?: any) => void> | string = [];

  // Queue of execution data for repeatable lists
  private queue: any[] = [];

  // Index of currently firing callback (modified by add/remove as needed)
  private firingIndex = -1;

  private options!: { [x: string]: boolean };

  constructor(options: string | { [x: string]: boolean }) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    this.options = typeof options === 'string' ? this.createOptions(options) : { ...options };
  }

  private createOptions = (options: string) => {
    const object: {
      [x: string]: boolean;
    } = {};
    (options.match(rnothtmlwhite) || []).forEach(flag => {
      object[flag] = true;
    });
    return object;
  };

  // Fire callbacks
  private innerFire() {
    // Enforce single-firing
    this._locked = this._locked || this.options.once;

    // Execute callbacks for all pending executions,
    // respecting firingIndex overrides and runtime changes
    this.firing = true;
    this._fired = this.firing;

    for (; this.queue.length; this.firingIndex = -1) {
      this.memory = this.queue.shift();
      while (++this.firingIndex < this.list.length) {
        // Run callback and check for early termination
        const fn = this.list[this.firingIndex] as (args?: any) => void;
        if (fn.apply(this.memory[0], this.memory[1]) == null && this.options.stopOnFalse) {
          // Jump to end and forget the data so .add doesn't re-fire
          this.firingIndex = this.list.length;
          this.memory = false;
        }
      }
    }

    // Forget the data if we're done with it
    if (!this.options.memory) {
      this.memory = false;
    }

    this.firing = false;

    // Clean up if we're done firing for good
    if (this._locked) {
      // Keep an empty list if we have data for future add calls
      if (this.memory) {
        this.list = [];
        // Otherwise, this object is spent
      } else {
        this.list = '';
      }
    }
  }

  // eslint-disable-next-line no-confusing-arrow
  private inArray = (arr: any[], elem: any, i?: number) =>
    arr == null ? -1 : [].indexOf.call(arr, elem, i);

  // private isArrayLike = (obj: any) => {
  //   // Support: real iOS 8.2 only (not reproducible in simulator)
  //   // `in` check used to prevent JIT error (gh-2145)
  //   // hasOwn isn't used here due to false negatives
  //   // regarding Nodelist length in IE
  //   const length = !!obj && 'length' in obj && obj.length;
  //   const type = this.toType(obj);

  //   if (typeof obj === 'function' || (obj != null && obj === obj.window)) {
  //     return false;
  //   }

  //   return (
  //     type === 'array'
  //     || length === 0
  //     (typeof length === 'number' && length > 0 && length - 1 in obj)
  //   );
  // };

  private each = (obj: any, callback: any) => {
    let i = 0;
    if (_.isArray(obj)) {
      for (; i < obj.length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    } else {
      // eslint-disable-next-line consistent-return
      Object.keys(obj).forEach(k => {
        if (callback.call(obj[k], k, obj[k]) === false) {
          return false;
        }
      });
    }

    return obj;
  };

  private toType = (obj: any) => {
    const class2type = {} as any;
    if (obj == null) {
      return `${obj}`;
    }
    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[toString.call(obj)] || 'object'
      : typeof obj;
  };

  // Add a callback or a collection of callbacks to the list
  public add = (...cbs: any[]) => {
    const innerHas = this.has;
    const innerOpts = this.options;
    const innerList = this.list as Array<(args?: any) => void>;
    const innerEach = this.each;
    const innerToType = this.toType;

    if (this.list) {
      // If we have memory from a past run, we should fire after adding
      if (this.memory && !this.firing) {
        this.firingIndex = this.list.length - 1;
        this.queue.push(this.memory);
      }

      (function add(args) {
        innerEach(args, (t: any, arg: any) => {
          if (typeof arg === 'function') {
            if (!innerOpts.unique || !innerHas(arg)) {
              innerList.push(arg);
            }
          } else if (arg && arg.length && innerToType(arg) !== 'string') {
            // Inspect recursively
            add(arg);
          }
        });
      })(cbs);

      if (this.memory && !this.firing) {
        this.innerFire();
      }
    }
    return this;
  };

  // Remove a callback from the list
  public remove = (...args: any[]) => {
    [].forEach.call(args, (arg: any) => {
      let index = -999;
      index = this.inArray(arg, this.list);
      while (index > -1) {
        (this.list as Array<(params?: any) => void>).splice(index, 1);
        // Handle firing indexes
        if (index <= this.firingIndex) {
          this.firingIndex--;
        }
        index = this.inArray(arg, this.list);
      }
    });
    return this;
  };

  // Check if a given callback is in the list.
  // If no argument is given, return whether or not list has callbacks attached.
  public has = (fn: (args?: any) => void) =>
    fn ? (this.list == null ? -1 : [].indexOf.call(this.list, fn)) : this.list.length > 0;

  // Remove all callbacks from the list
  public empty = () => {
    if (this.list) {
      this.list = [];
    }
    return this;
  };

  // Disable .fire and .add
  // Abort any current/pending executions
  // Clear all callbacks and values
  public disable = () => {
    this._locked = this.queue = [];
    this.list = this.memory = '';
    return this;
  };

  public disabled = () => !this.list;

  // Disable .fire
  // Also disable .add unless we have memory (since it would have no effect)
  // Abort any pending executions
  public lock = () => {
    this._locked = this.queue = [];
    if (!this.memory && !this.firing) {
      this.list = this.memory = '';
    }
    return this;
  };

  public locked = () => !!this._locked;

  // Call all callbacks with the given context and arguments
  private fireWith = (context?: any, args?: any[]) => {
    if (!this._locked) {
      args = args || [];
      args = [context, args.slice ? args.slice() : args];
      this.queue.push(args);
      if (!this.firing) {
        this.innerFire();
      }
    }
    return this;
  };

  // Call all the callbacks with the given arguments
  public fire = (...args: any[]) => {
    this.fireWith(this, args);
    return this;
  };

  public fired = () => !!this._fired;
}
