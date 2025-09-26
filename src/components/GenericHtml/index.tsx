import style from "./style.module.css";

type genericHtmlProps = {
  children: React.ReactNode;    
};

export function GenericHtml({ children } : genericHtmlProps ) {
  return (
    <div  className={style.genericHtml}>
      {children}
    </div>
  );
}