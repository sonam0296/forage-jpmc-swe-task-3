import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    // return serverResponds.map((el: any) => {
      const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2
      const priceDEF = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2
      const ratio = priceABC / priceDEF
      const upperBound = 1 + 0.05;
      const lowerBound = 1 - 0.05;
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio: ratio,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined
      };
    // })
  }
}
