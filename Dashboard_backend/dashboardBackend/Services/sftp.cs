using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Services
{
    public static class Sftp
    {
        // Enter your host name or IP here
        private static string host = "192.168.199.200";
        // Enter your sftp username here
        private static string username = "getaby";
        // Enter your sftp password here
        private static string password = "D2_Getaby";
        public static int Download(string fileName)
        {
            var connectionInfo = new ConnectionInfo(host, "sftp", new PasswordAuthenticationMethod(username, password));


            using (SftpClient sftp = new SftpClient(host, username, password))
            {
                try
                {
                    sftp.Connect();

                    Debug.WriteLine("Downloading {0}", fileName);

                    using (Stream fileStream = File.OpenWrite(@"c:\test\MyTest.jpg"))
                    {
                        sftp.DownloadFile(fileName, fileStream);
                    }

                    sftp.Disconnect();
                }
                catch (Exception er)
                {
                    Debug.WriteLine("An exception has been caught " + er.ToString());
                }
            }
            return 0;
        }
    }     
}
