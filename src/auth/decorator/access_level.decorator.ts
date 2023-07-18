import { SetMetadata } from '@nestjs/common';
import { ACCESS_KEY} from 'src/constants/key-decorator';
import { ACCESS_LEVEL } from 'src/constants/roles';

export const AccessLevel = (level: keyof typeof ACCESS_LEVEL) => SetMetadata(ACCESS_KEY, level);