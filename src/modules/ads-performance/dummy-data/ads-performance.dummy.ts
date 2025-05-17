import { ContractEntity } from 'src/modules/contract/entities/contract.entity';

export const dummyAdsPerformance = (contract: ContractEntity) => [
  {
    contractId: contract.id,
    clientId: contract.clientId,
    actualValue: 0.5,
  },
  {
    contractId: contract.id,
    clientId: contract.clientId,
    actualValue: 0.01,
  },
];
