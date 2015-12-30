using DAL.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class SoftuniadaDAL
    {
        private ExtendedSoftuniadaEntities db;

        protected ExtendedSoftuniadaEntities DB
        {
            get
            {
                return this.db;
            }
        }

        public SoftuniadaDAL(string userId)
        {
            db = new ExtendedSoftuniadaEntities(userId);
        }

        // Use this constructor for unit tests.
        public SoftuniadaDAL(ExtendedSoftuniadaEntities extendedSoftuniadaEntities)
        {
            db = extendedSoftuniadaEntities;
        }
    }
}
