const generateMarketData = () => {
  return {
    markets: {
      npe: {
        name: "npe",
        var_type: "energy",
        node: "electricitygrid",
        pgroup: "p1",
        direction: "none",
        realisation: {},
        reserve_type: {}, // Correctly specifying it as an empty map
        is_bid: true,
        is_limited: false,
        min_bid: 0.0,
        max_bid: 0.0,
        fee: 0.0,
        price: {
          ts_data: [
            { scenario: "s1", series: {} }, // series is an empty map
            { scenario: "s2", series: {} }  // series is an empty map
          ]
        },
        up_price: {
          ts_data: [
            { scenario: "s1", series: {} }, // series is an empty map
            { scenario: "s2", series: {} }  // series is an empty map
          ]
        },
        down_price: {
          ts_data: [
            { scenario: "s1", series: {} }, // series is an empty map
            { scenario: "s2", series: {} }  // series is an empty map
          ]
        },
        fixed: []
      }
    }
  };
};

export default generateMarketData;
