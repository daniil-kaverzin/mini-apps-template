import { Context, useContext } from 'react';

export function createUseNullableContext<C>(
  hookName: string,
  context: Context<C | null>,
): () => C {
  return () => {
    const value = useContext(context);

    if (!value) {
      throw new Error(
        `Hook ${hookName} was called outside of context provider context`,
      );
    }

    return value;
  };
}
