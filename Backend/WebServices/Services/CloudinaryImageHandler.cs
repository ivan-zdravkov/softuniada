using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebServices.Interfaces;

namespace WebServices.Services
{
    public class CloudinaryImageHandler : IImageHandlerInterface
    {
        public string GenerateImageURLFromImageDataString(string imageDataString)
        {
            return imageDataString;
        }
    }
}