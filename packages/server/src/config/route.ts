import { AuthModule } from 'src/auth/auth.module';
import { CafeModule } from 'src/cafe/cafe.module';
import { OrderModule } from 'src/order/order.module';
import { UserModule } from 'src/user/user.module';

export const routeTable = {
  path: 'api/v1',
  children: [
    {
      path: 'user',
      module: UserModule,
    },
    {
      path: 'order',
      module: OrderModule,
    },
    {
      path: 'cafe',
      module: CafeModule,
    },
    {
      path: 'auth',
      module: AuthModule,
    },
  ],
};
