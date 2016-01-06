using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServices.Interfaces
{
    public interface IImageHandlerInterface
    {
        string GenerateImageURLFromImageDataString(string imageDataString);
    }
}