




export class Command<T> {


  private promise: Promise<T> = null;
  private resolveOfPromise: (value?: T | PromiseLike<T>) => void;
  private rejectOfPromise: (reason?: any) => void


  reject( reason: any ) {

    this.rejectOfPromise( reason );
  }

  resolve( value: T) {

    this.resolveOfPromise( value );
  }

  toPromise() {

    return this.promise;
  }

  constructor() {

    this.promise = new Promise<T>( (resolve, reject) => {

      this.resolveOfPromise = resolve;
      this.rejectOfPromise = reject;
    });
  }

}


