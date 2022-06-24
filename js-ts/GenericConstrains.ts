type constrainsArr = [1, 2];

type abc<T> = T extends constrainsArr ? 1 : 2;

const cons: abc<[1, [2]]> = 1;
