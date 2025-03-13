import scheduler from 'adonisjs-scheduler/services/main'
import ClearExpiredRefreshTokens from '../commands/clear_expired_refresh_tokens.js'

scheduler.command(ClearExpiredRefreshTokens).twiceDaily(1, 13)
