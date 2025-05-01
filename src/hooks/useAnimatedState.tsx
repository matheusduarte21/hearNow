
import { useState, useEffect } from "react";

/**
 * Custom hook that provides a delayed state change with animation support
 * @param initialValue Initial state value
 * @param delay Delay in ms before changing state
 * @returns [value, setValue, isTransitioning]
 */
function useAnimatedState<T>(
  initialValue: T,
  delay: number = 300
): [T, (newValue: T) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const updateValue = (newValue: T) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setValue(newValue);
      setIsTransitioning(false);
    }, delay);
  };
  
  return [value, updateValue, isTransitioning];
}

export default useAnimatedState;
