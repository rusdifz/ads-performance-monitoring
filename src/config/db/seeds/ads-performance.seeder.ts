import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { AdsPerformanceEntity } from 'src/modules/ads-performance/entities/ads-performance.entity';
import { ContractEntity } from 'src/modules/contract/entities/contract.entity';
import { KpiEnums } from 'src/common/enums/kpi.enums';

export class AdsClientContractSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repositoryClient = dataSource.getRepository(ClientEntity);
    await repositoryClient.delete({}); // Kosongkan tabel

    const saveDataCLient = await repositoryClient.save([
      {
        name: 'Hilir Digital',
      },
      {
        name: 'PT Abadi Gemilang',
      },
      {
        name: 'Digital Agency',
      },
    ]);

    if (saveDataCLient.length > 0) {
      for (const client of saveDataCLient) {
        const repositoryContract = dataSource.getRepository(ContractEntity);
        await repositoryContract.delete({}); // Kosongkan tabel

        const saveDataContract = await repositoryContract.save([
          {
            clientId: client.id,
            kpiType: KpiEnums.CTR,
            kpiTarget: 0.03,
            startDate: '2025-05-01 00:00:00',
            endDate: '2025-05-30 08:00:00',
          },
          {
            clientId: client.id,
            kpiType: KpiEnums.IMPRESSION,
            kpiTarget: 0.3,
            startDate: '2025-06-01 00:00:00',
            endDate: '2025-06-30 08:00:00',
          },
        ]);

        if (saveDataContract.length > 0) {
          for (const contract of saveDataContract) {
            const repositoryAdsPerformance =
              dataSource.getRepository(AdsPerformanceEntity);

            await repositoryAdsPerformance.delete({});

            await repositoryAdsPerformance.save([
              {
                contractId: contract.id,
                clientId: contract.clientId,
                actualValue: 0.5,
                createdAt: '2025-05-05 08:00:00',
              },
              {
                contractId: contract.id,
                clientId: contract.clientId,
                actualValue: 0.01,
              },
            ]);
          }
        }
      }
    }
  }
}
