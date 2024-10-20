import {React, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option
} from "@material-tailwind/react";
import * as api from '../../api/index'

import Multiselect from 'multiselect-react-dropdown';
import { Spinner } from "@material-tailwind/react";

export function Enrichment() {

  // navigation 
  const navigate = useNavigate();

  // constants 
  

  
  const tasks = [

  {
      "ar": "تعريفات",
      "en": "definition"
  }
  // {
  //   "ar":"مصطلحات متخصصة",
  //   "en":"key_terms",
  // },
  // {
  //   "ar":"أحداث تاريخية",
  //   "en":"his_events",
  // },
  // {
  //   "ar":"أماكن",
  //   "en":"places",
  // }
  ]

  
  const domains = ["طب","زراعة","معلوماتية","علم البيانات"]
  const llms = ["Cohere"]

  // refs
  const source_ref = useRef(null)
  const task_ref = useRef(null)
  const domain_ref = useRef(null)
  const llm_ref = useRef(null)

  // states
  const [sources, setSources] = useState(
    [
    
  ]
  )

  const [postData, setPostData] = useState({ name: '', description: '', task: '', domain: '', input_words: '', source_ids: '' })
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  // apis 
  const fetchSources = async () => {
    try {
      const { data } = await api.fetchSources()
       setLoading(false)
       setSources(data.data)
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
  }


  const createWorker = async () => {
    try {

      const { data } = await api.PostWorker(
        {...postData, llm: llm_ref.current.getSelectedItems()[0], source_ids: source_ref.current.getSelectedItems().map(item => item.source_id), task: task_ref.current.getSelectedItems().map(item => item.en)[0], domain: domain_ref.current.getSelectedItems()[0]}
        )
        
      alert('تم إنشاء عملية إثراء بنجاح')
      console.log({...postData, source_ids: source_ref.current.getSelectedItems().map(item => item.source_id), task: task_ref.current.getSelectedItems().map(item => item.en)[0], domain: domain_ref.current.getSelectedItems()[0]})
      navigate('/dashboard/workers') // go to workers 
    } catch (error) {
      console.log(error)
      alert('حدث خطأ أثناء إنشاء عملية الإثراء')
    }
  }
    
  useEffect(() => {
    fetchSources()
  }, []);

  const [inputWords, setInputWords] = useState(false)
  return (

    <>
    
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8"> 
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h3" className=" text-[#007a82] font-noto">
            إنشاء عملية إثراء
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">

        {loading ? 
        <Spinner color="green" size="large" /> :
        <form className="mt-8 mb-2 max-w-screen-lg w-full">
          <div className="mb-1 flex flex-col gap-4">
            <div>
              <Typography variant="h6" className="font-lg mb-3 text-[#007a82] font-noto">
                إسم العملية
              </Typography>
              <Input
                size="lg"
                placeholder="إسم العملية"
                className=" !border-[#01A4AC] focus:!border-[#01A4AC]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setPostData({ ...postData, name: e.target.value })}
              />
            </div>
            <div>
              <Typography variant="h6" className="font-lg mb-3 text-[#007a82] font-noto">
                وصف العملية
              </Typography>
              <Textarea
                size="lg"
                placeholder="وصف العملية
                "
                className=" !border-[#01A4AC] focus:!border-[#01A4AC]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setPostData({ ...postData, description: e.target.value })}
              />
            </div>
                
            <div>
            <Typography variant="h6" className="font-lg mb-3 text-[#007a82] font-noto">
              النموذج اللغوي 
               </Typography>
            
               <Multiselect
                isObject={false}
                ref={llm_ref}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={function noRefCheck(){}}
                options={llms}
                className=" !border-[#01A4AC] focus:!border-[#01A4AC] border rounded-md  text-right"
                placeholder={null}
              // onChange={(e)=>{
              //   console.log(task_ref.current.getSelectedItems().map(item => item.en)[0] === 'تعريفات')
                 //if (task_ref.current.getSelectedItems().map(item => item.en)[0] == 'تعريفات') {
              //     setInputWords(true)
                 
              //   }else setInputWords(false)
              // }}
             
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
              singleSelect
            />
            </div>
            <div>
              <Typography variant="h6" className="font-lg mb-3 text-[#007a82] font-noto">
                المهمة 
               </Typography>
            
               <Multiselect
              displayValue="ar"
              ref={task_ref}
              onKeyPressFn={function noRefCheck(){}}
              onRemove={function noRefCheck(){}}
              onSearch={function noRefCheck(){}}
              onSelect={(selectedItem) => {
                if (selectedItem[0].ar == 'تعريفات') {
                  setInputWords(true)
                }else setInputWords(false)        
              }}
              options={tasks}
              className=" !border-[#01A4AC] focus:!border-[#01A4AC] border rounded-md  text-right"
              placeholder={null}
              // onChange={(e)=>{
              //   console.log(task_ref.current.getSelectedItems().map(item => item.en)[0] === 'تعريفات')
                 //if (task_ref.current.getSelectedItems().map(item => item.en)[0] == 'تعريفات') {
              //     setInputWords(true)
                 
              //   }else setInputWords(false)
              // }}
             
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
              singleSelect
            />
            </div>
            <div>
              <Typography variant="h6" className="font-lg mb-3 text-[#007a82] font-noto">
                المجال 
               </Typography>
            
               <Multiselect
              isObject={false}
              ref={domain_ref}
              onKeyPressFn={function noRefCheck(){}}
              onRemove={function noRefCheck(){}}
              onSearch={function noRefCheck(){}}
              onSelect={function noRefCheck(){}}
              options={domains}
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
              <Typography variant="h6" className="font-lg mb-3 text-[#007a82]">
                الكلمات المعنية <span className="text-sm font-noto font-light"> * قم بفصل الكلمات عن طريقة الفاصلة *</span>
               </Typography>
            
               <Textarea
                size="lg"
                placeholder="إستثناء, إستخارة, قلم,"
                className=" !border-[#01A4AC] focus:!border-[#01A4AC]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                disabled={inputWords ? false : true}
                onChange={(e) => setPostData({ ...postData, input_words: e.target.value })}
              />
            </div>
            <div>
            <Typography variant="h6" className="font-lg mb-3 text-[#007a82] font-noto">
                المصادر 
               </Typography>
              <Multiselect
                displayValue="source_name"
                ref={source_ref}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={function noRefCheck(){}}
                options={sources}
                className=" !border-[#01A4AC] focus:!border-[#01A4AC] border rounded-md  text-right"
                placeholder={null}
                style={{
                  chips: {
                    background: '#01A4AC'
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
                  }
                  
                }}
              />
          </div>

          </div>
          
          
          <Button className="mt-6 text-lg bg-[#007a82]" fullWidth onClick={createWorker}>
                تأكيد
          </Button>
        </form>
        }
        </CardBody>
      </Card>     
    
      
    
    </div>
    
    </>
  );
}

export default Enrichment;




