using Step1_Backend.Models;

namespace Step1_Backend.Services.TelegramService
{
    public interface ITelegramService
    {
        Task SendTelegramNotification(Reservation reservation);
    }
}
