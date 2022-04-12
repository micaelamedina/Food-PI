
import s from './styles/Paginated.module.css';

export default function Paginated({recipesPage, allRecipes, handleClickNumberPage, currentPage, maxLimitNumberPage, minLimitNumberPage, handleNextPage, handlePrevPage}) {
    const numberPage = [];
    for (let i = 1; i <= Math.ceil(allRecipes.length / recipesPage); i++) {
            numberPage.push(i);
    };
    let pageIncrement = null;
    if(numberPage.length > maxLimitNumberPage && parseInt(currentPage) !== Math.ceil(allRecipes.length / recipesPage)) {
        pageIncrement = <li onClick={handleNextPage}> &hellip; </li>
    };
    let pageDecrement = null;
    if(numberPage.length < maxLimitNumberPage && parseInt(currentPage) !== 1) {
        pageDecrement = <li onClick={handlePrevPage}> &hellip; </li>
    };
    // let pageNext = null;
    // if(numberPage.length < maxLimitNumberPage && parseInt(currentPage) !== Math.ceil(allRecipes.length / recipesPage)) {
    //     pageNext = <li onClick={handleNextPage}>{">"}</li>
    // };
    // let pagePrev = null;
    // if(numberPage.length < maxLimitNumberPage && parseInt(currentPage) !== 1) {
    //     pagePrev = <li onClick={handlePrevPage}>{"<"}</li>
    // };
    return(
        <div>
            {
                allRecipes.length && <nav>
                <ul className={s.numberPage}>
                    <li>
                    <button className={s.buttonPrevNext} disabled={parseInt(currentPage) === 1 ? true : false} onClick={handlePrevPage}>{"<"}</button>
                    </li>
                    {/* {pagePrev} */}
                    {pageDecrement}
                    {
                            numberPage?numberPage.map((n,i) => {
                                if(n < maxLimitNumberPage+1 && n > minLimitNumberPage) {
                                return <li className={parseInt(currentPage) === parseInt(n) ? s.active : null}
                                key={n} id={n} onClick={(e)=>handleClickNumberPage(e)}>{n}
                                </li>
                            } else {
                                return null;
                            }})
                            :<p>Loading...</p>
                    }
                    {pageIncrement}
                    {/* {pageNext} */}
                    <li>
                    <button className={s.buttonPrevNext} disabled={parseInt(currentPage) === Math.ceil(allRecipes.length / recipesPage) ? true : false}
                    onClick={handleNextPage}>{">"}</button>
                    </li>
                </ul>
            </nav>
            }
            
        </div>
    )
};