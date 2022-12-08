import { AuthModule } from 'src/auth/auth.module';
import { CafeModule } from 'src/cafe/cafe.module';
import { OrderModuleV1 } from 'src/order/order.v1.module';
import { OrderModuleV2 } from 'src/order/order.v2.module';
import { UserModule } from 'src/user/user.module';

export const routeTable = {
  path: 'api',
  children: [
    {
      path: 'v1/user',
      module: UserModule,
    },
    {
      path: 'v1/order',
      module: OrderModuleV1,
    },
    {
      path: 'v2/order',
      module: OrderModuleV2,
    },
    {
      path: 'v1/cafe',
      module: CafeModule,
    },
    {
      path: 'v1/auth',
      module: AuthModule,
    },
  ],
};
