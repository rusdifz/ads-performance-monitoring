import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseQueryRepository {
  sort(query: Record<string, any>, props: { sort?: string; order?: string }) {
    if (props.sort && props.order) {
      Object.assign(query, {
        order: {
          [props.sort]: props.order.toLowerCase() === 'asc' ? 'ASC' : 'DESC',
        },
      });
    }

    return query;
  }

  paginate(
    query: Record<string, any>,
    props: { page?: number; limit?: number },
  ) {
    if (props.limit) {
      Object.assign(query, { take: props.limit });
    }
    if (props.page && props.limit) {
      Object.assign(query, { skip: (props.page - 1) * props.limit });
    }

    return query;
  }
}
