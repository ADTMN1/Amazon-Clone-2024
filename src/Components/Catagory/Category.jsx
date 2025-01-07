import React from 'react';
import CategoryCard from './CategoryCard';
import { CategoryInfos } from './CategoryFullinfos';
import classes from "./Category.module.css"
function Category() {
    return (
        <section className={classes.Category_container}>
            {
                CategoryInfos.map((infos) => {
                    return <CategoryCard data={infos} key={infos.name} />;
                })
            }
        </section>
    );
}

export default Category;
