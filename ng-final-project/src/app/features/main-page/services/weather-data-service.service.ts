import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataServiceService {
  public api_key_options = 
  [
    '19390cb9d4msh526432bedef9373p147597jsn06606fea107d',
    'befb762131msh0fca0ea1158c417p1c829djsn8dca637f2a02',
    'ec49eb0927mshd3340c35846f4edp1938bbjsne18cf19afb20',
    '2350909e71mshb0e23036efad877p1f3d76jsnc6f1f60bfa09',
    '1286c0f3b2mshefc1bf9f52daa48p1efd13jsn6b3d52fd1ee4',
    'd3eff14730mshb096df999c41f99p19e974jsnd959d98b7e97',
    'eff42ef84bmsh647db56fbd4359bp14c9afjsn178584f08a6d',
    '6fb1acb66bmsh17f9fd0f5859789p14ebc6jsnd80790c4de3e',
    'c87a5568f7msh66a6b14a73f5e1dp15c0bajsn33b88df26ef0',
    'a2de218ba2msh4885af07ea0fc98p147e0djsnbc0e579ef4e7',
    'e33834454emsh10fce08cab4f5d8p1b3e5djsn9650058bec15',
    'ba9a9cac8amsh90dedb6eaf4a728p147bcdjsnc74581430142',
    'ff7e77eac1msh34de1fb494d6eb5p1b9069jsn4c94f11e05fd',
    '36eb294ba0mshca62b1022389512p17edd7jsne9a556220e35',
    '03a82e4b0fmsh4310dfcf8136efep1a9306jsn389f71b5664c',
    '66daa78204msh9cdd771907274d5p1ca8e6jsn5ac3e019e470',
    '670de1c4f1mshe613b2f8fd56572p1fd28ejsn11f1f008bdcc',
    'fd6e7757bemshe857a404f250231p17bdb9jsn5f64abc15e08',
    'e133d6efacmsha26c38947072113p134061jsnd0945a0730ad',
    '405265b9c1mshd2741fe819a8a71p164fcfjsn8a506ef37a1a',
    'd29f688541mshf403147890d53aap1eb68djsnb71fca0d4ef9'
  ];
  constructor() { }
}
