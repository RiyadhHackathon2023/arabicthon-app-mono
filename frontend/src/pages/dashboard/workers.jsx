import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from '../../api/index'

const chips_status = {
    "Running" : "blue",
    "Pending" : "indigo",
    "Completed" : "green",
    "Failed" : "red",
    "Canceled" : "amber",
}
export function Workers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([
      {
        "worker_id": "",
        "worker_name": "",
        "worker_status": "",
        "worker_description": "",

        "domain": "",
        "task": "",
        "completion": 0,
    },

  ])

  // API : 
  const fetchWorkers = async () => {
    try {
      const { data } = await api.fetchWorkers()
      console.log(data.data)
       setWorkers(data.data)
    } catch (error) {
      console.log(error)
    }
  }
    
  useEffect(() => {
    fetchWorkers()
  }, []);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      
      <Card className="h-[calc(100vh-160px)]">
        <CardHeader variant="gradient" className="mb-8 p-6 bg-[#007a82] font-noto font-bold">
          <Typography variant="h6" color="white">
            قائمة عمليات الإثراء
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["إسم العملية", "المهمة", "المجال", "الحالة", "نسبة عملية التحقق",""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-right text-noto "
                    >
                      <Typography
                        className="text-[13px] uppercase text-blue-gray-400  text-noto font-bold"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {workers.map(
                ({worker_id,worker_name, domain, task, worker_status, completion, source}, key) => {
                  const className = `py-3 px-5 ${
                    key === workers.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={worker_id} onClick={() => navigate(`/dashboard/worker/detail/${worker_id}`
                    )}
                      className="hover:bg-blue-gray-100"
                    >
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold font-noto text-blue-gray-800"
                          >
                            {worker_name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className} 
                      >
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold font-noto text-blue-gray-800"
                          >
                            {t(task)}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="font-bold font-noto text-blue-gray-800"
                        >
                          {domain}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="outlined"
                          color={chips_status[worker_status]}
                          value={t(worker_status)}
                          className="py-0.5 px-2 text-[13px] w-fit font-medium font-noto "
                        />
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-sm font-medium text-blue-gray-600"
                          >
                            {completion == 100 ? "100" : completion.toString().substring(0,5)} %
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "gray"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      
                      <td className={className}>
                        <Chip
                          variant="ghost"
                          color="green"
                          value={"معرفة المزيد"}
                          className="py-0.5 px-2 text-[13px] w-fit font-medium font-noto" 
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Workers;
