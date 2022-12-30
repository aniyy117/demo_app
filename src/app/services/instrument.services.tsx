import { API } from "./api-services";

const url = "api/v2/instruments";
const quotes_url = "api/v2/quotes/";

class InstrumentSercices {
  get = () => {
    return API.get(url);
  };
  get_quotes = (symbol: string) => {
    return API.get(quotes_url + symbol);
  };
}

const instrument_Sercices = new InstrumentSercices();

export default instrument_Sercices;
