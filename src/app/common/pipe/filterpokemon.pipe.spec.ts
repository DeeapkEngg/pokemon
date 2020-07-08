import { FilterpokemonPipe } from './filterpokemon.pipe';
let pipe;
fdescribe('FilterpokemonPipe', () => {
  beforeEach(() => {
     pipe = new FilterpokemonPipe();
  });

  it('Empty array passed', () => {
    const pokemon = [];
    const values = 'abc';
    const data = pipe.transform(pokemon, values);
    expect(data).toEqual(pokemon);
  });
  it('Empty value passed', () => {
    const pokemon = [1, 2, 3];
    const values = '';
    const data = pipe.transform(pokemon, values);
    expect(data).toEqual(pokemon);
  });
  it('filter array having matched value', () => {
    const pokemon = [{name: 'abcd'}, {name: 'defg'}, {name: 'klmno'}];
    const values = 'ABC';
    const data = pipe.transform(pokemon, values);
    expect(data.length).toBe(1);
  });
  it('filter array having no matched value', () => {
    const pokemon = [{name: 'abcd'}, {name: 'defg'}, {name: 'klmno'}];
    const values = '123';
    const data = pipe.transform(pokemon, values);
    expect(data.length).toBe(0);
  });
});
