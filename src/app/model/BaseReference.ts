


export abstract class BaseReference<T> {


  private _value: T = null;

  public set value( value: T|null) {

    this._value = value;

    this.onSetValue( this._value );

    // this._subject.next( value );
  }

  public get value(): T|null {

    return this._value;
  }


  abstract onSetValue(value: T|null);

  constructor( value: T|null ) {

    if ( value ) {

      this.value = value;
    }
  }

}
