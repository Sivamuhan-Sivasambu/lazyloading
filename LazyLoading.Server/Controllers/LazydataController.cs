using Bogus;
using LazyLoading.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace LazyLoading.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LazydataController : ControllerBase
    {
        private readonly ILogger<LazydataController> _logger;
        private readonly List<User> _sampleData = new List<User>();

        public LazydataController(ILogger<LazydataController> logger)
        {
            _logger = logger;

            _sampleData = GetSampleData();
        }

        [HttpGet(Name = "GetLazyData")]
        public List<User> GetLazyData(int? pageNumber, int? pageSize)
        {
            var numberOfRecordToskip = (pageNumber ?? 0) * (pageSize ?? 50);
            return _sampleData.Skip(Convert.ToInt32(numberOfRecordToskip)).Take( pageSize ?? 50).OrderBy(x => x.Id).ToList();
        }


        private List<User> GetSampleData()
        {
            var userId = 1;

            var userFaker = new Faker<User>()
                .RuleFor(u => u.Id, _ => userId++)
                .RuleFor(u => u.Name, f => f.Name.FirstName())
                .RuleFor(u => u.LastName, f => f.Name.LastName())
                .RuleFor(u => u.Country, f => f.Address.Country())
                .RuleFor(u => u.Phone, f => f.Phone.PhoneNumberFormat());

            var users = userFaker.Generate(10000);

            return users;
        }
    }
}
