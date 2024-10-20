import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input
} from "@material-tailwind/react";
import Multiselect from 'multiselect-react-dropdown';
import { useRef } from "react";
import { ProfileInfoCard } from "@/widgets/cards";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { LinkIcon } from "@heroicons/react/20/solid";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import * as api from "@/api";
import { useTranslation } from "react-i18next";


import axios from "axios";
export function Sources() {
  const { t } = useTranslation();
      
  const source_types = ["Url"]

  // refs
  const type_ref = useRef(null)

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

  // API : 
  const fetchSources = async () => {
    try {
      const { data } = await api.fetchSources()
      setSources(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const [sourceData, setSourceData] = useState({ source_name:"", source_url :"" , source_type: "" })
  const postSource = async () => {
    try {
    
      const { data } = await api.PostSourceUrl({...sourceData, source_type: type_ref.current.getSelectedItems()[0]})
      fetchSources()
    } catch (error) {
      console.log(error)
    }
  }


    
  useEffect(() => {
    fetchSources()
  }, []);
  return (
    <>
       <div className="mt-12 mb-8 flex flex-col gap-12">
      
      <Card className="h-[calc(40vh)]">
        <CardHeader variant="gradient" className="mb-8 p-6 bg-[#007a82] font-noto font-bold">
          <Typography variant="h6" color="white">
            قائمة المصادر
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        
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
                            className="font-bold font-noto text-blue-gray-800 w-1/4 "
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

          
        </CardBody>
      </Card>
      <Card className="h-fit">
        
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <Typography variant="h5" color="blue-gray" className="font-noto font-bold underline mt-10 mr-6 mb-3">
              إضافة مصدر
          </Typography>

          <form className="mt-3 mb-2 max-w-screen-lg w-full mr-6 ">
          <div className="mb-1 flex flex-col gap-4">
            <div>
              <Typography variant="h6" className="text-sm font-lg mb-3 text-[#007a82] font-noto">
                إسم  المصدر
              </Typography>
              <Input
                size="lg"
                placeholder="إسم المصدر"
                // value={postData.source_name}
                className=" !border-[#01A4AC] focus:!border-[#01A4AC]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setSourceData({ ...sourceData, source_name: e.target.value })}
              />
            </div>
            <div>
              <Typography variant="h6" className="text-sm font-lg mb-3 text-[#007a82] font-noto">
                نوع المصدر 
               </Typography>
            
               <Multiselect
              isObject={false}
              ref={type_ref}
              onKeyPressFn={function noRefCheck(){}}
              onRemove={function noRefCheck(){}}
              onSearch={function noRefCheck(){}}
              onSelect={function noRefCheck(){}}
              options={source_types}
              className=" !border-[#01A4AC] focus:!border-[#01A4AC] border rounded-md  text-right"
              placeholder={null}
              style={{
                chips: {
                  background: '#01A4AC',
                  color: '#fff',
                },
                highlightOption: {
                  background: '#01A4AC',
                  color: '#fff'
                },
                highlight:{
                  background: '#007a82',
                  color: '#fff'
                },
                
                multiselectContainer: {
                  color: 'black',
                },
                option: {
                  background: '#fff',
                  color: '#007a82'
                },
                searchBox: {
                  'border': '0px solid #01A4AC',
                  'border-radius': '0px'
                },
                closeIcon:{
                  'margin': '5px',
                  display: 'none'
                },
              }}
              singleSelect />
            </div>
                
            <div>
              <Typography variant="h6" className="text-sm font-lg mb-3 text-[#007a82] font-noto">
                رابط المصدر
              </Typography>
              <Input
                size="lg"
                // value={postData.source_url}
                placeholder="رابط المصدر"
                className=" !border-[#01A4AC] focus:!border-[#01A4AC]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setSourceData({ ...sourceData, source_url: e.target.value })}
              />
            </div>
          

          </div>
          
          
          <Button className="mt-6 text-lg py-2 bg-[#007a82]"  onClick={()=>{postSource()}}>
                تأكيد
          </Button>
        </form>
        </CardBody>
      </Card>
    </div>
    </>
  );
}

export default Sources;
