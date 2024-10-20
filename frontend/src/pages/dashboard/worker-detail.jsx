import {
  Card,
  CardBody,

  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

import { ProfileInfoCard } from "@/widgets/cards";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import * as api from "@/api";
import { useTranslation } from "react-i18next";
import { LinkIcon } from "@heroicons/react/20/solid";


export function WorkerDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [WorkerDetail, setWorkerDetail] = useState(
    {
      "worker_id": "",
      "worker_name": "",
      "worker_status": "",
      "worker_description": "",
      "worker_inputs": " ",
      "start_date":"",
      "end_date": " ",
      "domain": "",
      "task": "",
      "completion": 0,
  }
)
const [outputs, setOutputs] = useState(
  [
    {
      "id_relation": "1"  , 
      "word": "" ,
      "output": "",
      "status": "" 
    },

  ]

)
  // update status of output
  const updateOutput = async (id, updatedValues) => {
    try {
        const { data } = await api.PutRelation({
          id_relation: id,
          status: updatedValues,
        })
        fetWorkerDetail()
        // setOutputs(prevOutputs => {
        //   return prevOutputs.map(output => {
        //     if (output.id_relation === id) {
        //       // Update the status property for the matching object
        //       return { ...output, status: updatedValues };
        //     }
        //     return output;
        //   });
        // });
    } catch (error) {
      console.log(error)
    }
  }
  // API : 
  const [completion, setCompletion] = useState(0)
  const [sources, setSources] = useState(
    [
      {
          "source_id": ""  , 
          "name": "" ,
          "type": "" ,
          "url": "",        
      },
    ]
  
  )
  const fetWorkerDetail = async () => {
    try {
      const { data } = await api.fetchOneWorker(id)
       setWorkerDetail(data.data)
       setOutputs(data.data.outputs)
       setSources(data.data.sources)
    } catch (error) {
      console.log(error)
    }
  }
    
  useEffect(() => {
    fetWorkerDetail()
  }, []);
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-[#005859]" />
      </div>
      {WorkerDetail && 
        <Card className="mx-3 -mt-40 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            
            <div className="flex flex-col w-fit">
              
              <ProfileInfoCard
                title=" معلومات عامة"
                description= {WorkerDetail.worker_description}              
                details={{
                  "إسم العملية": WorkerDetail.worker_name,
                  "المهمة": t(WorkerDetail.task),
                  "المجال": WorkerDetail.domain,
                  // "الكلمات المعنية": WorkerDetail.worker_inputs,
                  // "تاريخ البدء": WorkerDetail.start_date.split("T")[0] + " [" + WorkerDetail.start_date.split("T")[1] + "]",
                  // "تاريخ الإنتهاء": WorkerDetail.end_date.split("T")[0] + " [" + WorkerDetail.end_date.split("T")[1] + "]",
                  "نسبة عملية التحقق من المخرجات": (Math.round(WorkerDetail.completion * 100) / 100).toFixed(2) + "%",
                }}
                status = {WorkerDetail.worker_status}
              />
              
              
              
            </div>
            <div className="px-4 pb-4">
            <Typography variant="h5" color="blue-gray" className="font-noto font-bold underline mt-10 mb-3">
                المصادر
            </Typography>
            <table className="w-full max-w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["إسم المصدر", "نوع", "الرابط",].map(
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
              {sources.map(
                ({source_id,source_name, source_url, source_type}, key) => {
                  const className = `py-3 px-5 ${
                    key === sources.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={source_id} 
                      className="hover:bg-blue-gray-100"
                    >
                      <td className={className}>
                        <div className="flex items-center gap-4 ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold font-noto text-blue-gray-800 w-1/4"
                          >
                            {source_name}
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
                            {source_type}
                          </Typography>
                        </div>
                      </td>

                      <td className={className} 
                      >
                        <div className="flex items-center gap-4 max-w-1/3 w-1/4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold font-noto text-blue-gray-800 truncate"
                          >

                            <a href={source_url} target="_blank" className="underline"><LinkIcon className="w-5 h-5" /></a>

                            
                          </Typography>
                        </div>
                      </td>

                      
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
            </div>
            <div className="px-4 pb-4">
            <Typography variant="h5" color="blue-gray" className="font-noto font-bold underline mt-10 mb-3">
                المخرجات
            </Typography>
            <table className="w-full min-w-[640px] table-auto overflow-scroll h[400px]">
              <thead>
                <tr>
                  { WorkerDetail.task === "definition" ? ["الكلمة المدخلة", "المخرج", "الحالة",].map(
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
                  ):
                  
                  [ "المخرج", "الحالة"].map(
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
                  )
                  
                  }
                </tr>
              </thead>
              <tbody>
                {outputs.map(
                  ({id_relation,word, definition, status}, key) => {
                    const className = `py-3 px-5 ${
                      key === outputs.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={id_relation} 
                        className="hover:bg-blue-gray-100"
                      >
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold font-noto text-blue-gray-800"
                            >
                              {word}
                            </Typography>
                          </div>
                        </td>
                        { 
                        WorkerDetail.task === "definition" && <td className={className} 
                        >
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold font-noto text-blue-gray-800"
                            >
                              {definition}
                            </Typography>
                          </div>
                        </td>
                        
                        } 
                        <td className={className} 
                        >
                          <div className="flex items-center gap-4">
                          <Menu
                                animate={{
                                  mount: { y: 0 },
                                  unmount: { y: 25 },
                                }}
                              >
                                <MenuHandler>
                                  <Button
                                    variant="text"
                                    className="flex bg-[#007a82] color-white text-white items-center font-noto text-xs w-[120px]  py-2 px-5 font-normal capitalize tracking-normal"
                                  >
                                    {/* <Typography variant="small" > */}
                                    {t(status)} 
                                    {/* </Typography> */}
                                    <ChevronDownIcon
                                      strokeWidth={2.5}
                                      className={`h-3.5 w-3.5 mx-2 transition-transform absolute left-0 
                                      }`}
                                    />
                                  </Button>
                                </MenuHandler>
                                <MenuList >
                                  <MenuItem value={"pending"}   onClick={(e)=> updateOutput(id_relation, e.target.value)}>قيد المراجعة</MenuItem>
                                  <MenuItem value={"accepted"}  onClick={(e)=> updateOutput(id_relation, e.target.value)}>مقبول</MenuItem>
                                  <MenuItem value={"rejected"}  onClick={(e)=> updateOutput(id_relation, e.target.value)}>مرفوض</MenuItem>
                                </MenuList>
                          </Menu>
                          </div>
                        </td>

                        
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            </div>
            
          </CardBody>
        </Card>
      }
    </>
  );
}

export default WorkerDetail;
