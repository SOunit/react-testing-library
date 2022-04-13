import { createContext, useContext, useState, useMemo } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  // error if call useOrderTails outside provider, OrderDetailsProvider
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotalSubtotal = calculateSubtotal("grandTotal", optionCounts);

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingSubtotal,
      grandTotal: grandTotalSubtotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      // get option Map and make a copy
      const { optionType: optionMap } = optionCounts;
      const newOptionMap = new Map(optionMap);

      // update the copied Map
      newOptionMap.set(itemName, parseInt(newItemCount));

      // create new object with the old optionCounts plus new map
      const newOptionCounts = { ...optionCounts };
      newOptionCounts[optionType] = newOptionMap;

      // update state
      setOptionCounts(newOptionCounts);
    };

    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts]);

  return <OrderDetails.Provider value={value} {...props} />;
};
