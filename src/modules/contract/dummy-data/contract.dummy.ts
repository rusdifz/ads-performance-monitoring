import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { KpiEnums } from 'src/common/enums/kpi.enums';

export const dummyContract = (client: ClientEntity) => [
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
];
