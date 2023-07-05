import { SetMetadata } from '@nestjs/common';
import { ACCESS_KEY} from 'src/constants/key-decorator';

export const AccessLevel = (level: number) => SetMetadata(ACCESS_KEY, level);