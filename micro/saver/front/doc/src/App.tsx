import {useCallback, useState } from 'react'
import './App.css'
import { Viewer } from '@react-pdf-viewer/core';
import { Button, Collapse, Dialog, Divider, FileInput,  Menu, MenuItem, Pre, ProgressBar } from '@blueprintjs/core'
import axios from 'axios'

import { pdfjs } from 'react-pdf';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


interface UploadProps{
  onChange: (file: File) => void
  setUrl: (url:string)  => void
}

function Upload(props : UploadProps){

  return (
      <FileInput text="Загрузи один PDF документ" onChange={e => {
            const files = e.target.files
            if (files.length > 0){
              const file = files[0]
              props.setUrl(URL.createObjectURL(file))
              props.onChange(file);
            }
          }}/>
  )
}

const BASE_URL = '/api'



interface ControlButtonsProps{
  onStart: () => void
  onStop: () => void
  onStatus: () => void
}

function ControlButtons(props: ControlButtonsProps){
  return (
  <div className='container'>
    <Menu>
      <h3>Обработка</h3>
      <MenuItem icon="new-text-box" onClick={props.onStart} text="Запустить" />
      <MenuItem icon="new-object" onClick={props.onStop} text="'Остановить" />
      <MenuItem icon="new-link" onClick={props.onStatus} text="Узнать статус " />
    </Menu>
  </div>
  )
}

interface PreviewProps{
  status: string;
  openLogs: boolean;
  setOpenLogs: (status: boolean) => void
}

function Preview(props: PreviewProps){
  return <div className='container'>
    <h3>Статус</h3>
    <Button onClick={()=>props.setOpenLogs(!props.openLogs)}>
      {props.openLogs? "Скрыть" : "Показать"} 
    </Button>
    <Collapse isOpen={props.openLogs}>
      <Pre className='container logs'>
        {props.status}
      </Pre>
    </Collapse>
  </div>
}

export function App() {
  const [fileUrl,setFileUrl] = useState<string>('')
  const [file, setFile] = useState<File>(null)
  const [taskSemanticId,setTaskSemanticId] = useState<string>(null)
  const [status,setStatus]  = useState('Запусти обработку и нажми статус')
  const [progressBar,setProgressBar] = useState(0)
  const [openLogs,setOpenLogs] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);

  function onStart(){
    console.log(file)
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    axios.post(BASE_URL + '/ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      ,
      onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
          console.log(progressEvent.loaded + ' ' + progressEvent.total);
          setProgressBar(progressEvent.loaded);
      }
     }
    }).then(
      async (r) => {
        setTaskSemanticId(await r.data)
        console.log(taskSemanticId)
    }).catch(
      (e)=>console.log(e)
    )
  }

  function onStop(){
    axios.get(BASE_URL+`cancel/${taskSemanticId}`).then(
      async (r) => {setStatus(await r.data)}
    )

  }

  
  async function onStatus(){
    await axios.get(BASE_URL+`status/${taskSemanticId}`).then(
      async (r) => {setStatus(await r.data)}
    )
  }



  return (
    <>
      <Dialog className='center' isOpen={isOpen} onClose={handleClose}>
        <div className='modalViewer'>
          <Viewer fileUrl={fileUrl}/>
        </div>
      </Dialog>
      <h2>Распознание документа</h2>
      <div className='app'>
        
        <div className='container item'>
            <h3>Форма загрузки</h3>
            <Upload onChange={setFile} setUrl={setFileUrl}/>
            <h3>Просмотр документа</h3>
            <div className='container viewer' onDoubleClick={()=>setIsOpen(true)}>
              {fileUrl ?
                <Viewer fileUrl={fileUrl}/>
                : <p>Прежде, загрузите файл</p>
              }
            </div>

        </div>
        <div className='container item'>
            <h3> Панель управления</h3>
            <div  className='option'>
              <div className='item'>
                <ControlButtons onStart={onStart} onStop={onStop} onStatus={onStatus}/>
              </div>
              <div className='item'>
                <Preview status={status} openLogs={openLogs} setOpenLogs={setOpenLogs}/>
              </div>
            </div>
            <Divider/>
            <div className='container'>
              <h3>Текущий прогресс</h3>
              <ProgressBar value={progressBar} />
            </div>
        </div>
      </div>
    </>
  )
}
