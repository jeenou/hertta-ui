// src/Input_Markets.js

const generateMarketData = () => {
    return {
      markets: {
        npe: {
          name: "npe",
          m_type: "energy",
          node: "electricitygrid",
          pgroup: "p1",
          direction: "none",
          realisation: {},
          reserve_type: "none",
          is_bid: true,
          is_limited: false,
          min_bid: 0.0,
          max_bid: 0.0,
          fee: 0.0,
          price: {
            ts_data: [
              { scenario: "s1", series: [] },
              { scenario: "s2", series: [] }
            ]
          },
          up_price: {
            ts_data: [
              { scenario: "s1", series: [] },
              { scenario: "s2", series: [] }
            ]
          },
          down_price: {
            ts_data: [
              { scenario: "s1", series: [] },
              { scenario: "s2", series: [] }
            ]
          },
          fixed: []
        }
      }
    };
  };
  
  export default generateMarketData;
  