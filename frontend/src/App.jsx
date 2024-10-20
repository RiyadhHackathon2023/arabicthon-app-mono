import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth} from "@/layouts";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useUser } from '@clerk/clerk-react'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "home": "Home",
        }
      },
      ar: {
        translation: {
          "home": "الرئيسية",
          "workers": "عمليات الإثراء",
          "worker": "تفاصيل عملية الإثراء",
          "sources": "المصادر",
          "Running" : "قيد التشغيل",
          "Pending" : "قيد الانتظار",
          "Completed" : "مكتمل",
          "Failed" : "معطل",
          "Canceled" : "ملغى",
          "pending": "قيد المراجعة",
          "accepted": "مقبول",
          "rejected": "مرفوض",
          "url": "رابط",
          "file": "ملف",
          "wikipedia": "ويكيبيديا",
          "definition": "تعريف",
          "enrichment": "عملية الإثراء" ,
          "key_terms": "مصطلحات متخصصة",
          "his_events": "أحداث تاريخية",
          "places": "أماكن",
        }
      }
    },
    lng: "ar", // if you're using a language detector, do not define the lng option
    fallbackLng: "ar",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

function App() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    // Handle loading state however you like
    return null
  }
  return (
    // <ClerkProvider publishableKey={publishableKey}>

    <Routes>
        { !isSignedIn ? 
        <>
          <Route path="/" element={<Auth />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth/*" replace />} />
        </>
          : 
          <>
          
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> 
        <Route path="*" element={<Navigate to="/dashboard/*" replace />} />
        </>
        }
    </Routes>
    // </ClerkProvider>
  );
}
export default App;
// if (!isLoaded) {
//   // Handle loading state however you like
//   return null
// }

// else if (isSignedIn) {

//   <Routes>
  
//     <Route path="/" element={<Dashboard />} />
//     <Route path="/dashboard/*" element={<Dashboard />} /> 
//     <Route path="*" element={<Navigate to="/dashboard/*" replace />} />
    
//   </Routes>
// }
// else {
// return (

//   <Routes>

//         <Route path="/" element={<Auth />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="*" element={<Navigate to="/auth" replace />}/>

//   </Routes>
// );
// }