import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { DatabaseService } from '../../db/index.js';
import { CreateUserDto } from '../../models/dto/create-user.dto.js';
import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class InsertUserCommand implements Command {
    constructor(private readonly prisma: DatabaseService) {}

    public names = [Lang.getRef('chatCommands.insertUser', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.HIDDEN;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, _data: EventData): Promise<void> {
        const createUserDto = new CreateUserDto();
        createUserDto.email = 'testuser@mail.com';
        createUserDto.password = 'testpassword';
        createUserDto.name = 'testuser';
        const result = await this.prisma.users.create({ data: createUserDto });
        await InteractionUtils.send(intr, result.id);
    }
}
