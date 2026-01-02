using Microsoft.Extensions.Options;
using Step1_Backend.Helpers;
using Step1_Backend.Models;
using System.Runtime.InteropServices;
using Telegram.Bot;
using Telegram.Bot.Types.Enums;

namespace Step1_Backend.Services.TelegramService
{
    public class TelegramService : ITelegramService
    {
        private readonly TelegramBotClient _client;
        private readonly TelegramSettings _settings;
        public TelegramService(IOptions<TelegramSettings> config)
        {
            _settings = config.Value;
            _client = new TelegramBotClient(_settings.Token);
        }
        public async Task SendTelegramNotification(Reservation reservation)
        {
            // 1. Get the Egypt Time Zone
            TimeZoneInfo egyptZone;

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                egyptZone = TimeZoneInfo.FindSystemTimeZoneById("Egypt Standard Time");
            }
            else
            {
                egyptZone = TimeZoneInfo.FindSystemTimeZoneById("Africa/Cairo");
            }

            // 2. Convert the UTC CreationDate to Egypt Time
            var egyptTime = TimeZoneInfo.ConvertTimeFromUtc(reservation.CreationDate, egyptZone);

            string planArabic = reservation.Subscription switch
            {
                SubscriptionPlan.ArabicFoundation => "تاسيس عربي",
                SubscriptionPlan.EnglishFoundation => "تاسيس انجليزي",
                SubscriptionPlan.SkillsDevelopment => "تنمية مهارات",
                _ => "غير محدد"
            };

            var message = $"🔔 *New Reservation*\n\n" +
              $"Parent Name: {reservation.ParentName}\n" +
              $"Child Name: {reservation.ChildName}\n" +
              $"Child Age: {reservation.ChildAge}\n" +
              $"Phone Number: {reservation.PhoneNumber}\n" +
              $"Email: {reservation.Email}\n" +
              $"Trainer Name: {reservation.Trainer.ArabicName}\n" +
              $"Subscription Plan: {planArabic}\n" +
              $"Created at: {egyptTime:dd/MM/yyyy hh:mm:ss tt}";

            await _client.SendMessage(
                chatId: _settings.ChatId,
                text: message,
                parseMode: ParseMode.Markdown
            );
        }
    }
}
