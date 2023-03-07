    const block = document.querySelector('.means__block');
   
    const getData = async () => {
        const result = await fetch('https://docs.google.com/spreadsheets/d/1nQuxFbJVp5OE0y6WViLFtjKCyOGZURUyuQnLaQ_EALw/htmlview')
            .then(res => res.text())
            .then(res => {
                let tableData = [];
                const formedСellСontent = (td1, td2) => {
                    let text = td1.innerText.replace(/\s+/g, ' ').trim();

                    if(text.length == 5) {
                        return `<div class="mean__subclass"><strong>${text}</strong> ${td2.innerText}</div>`;
                    }
                    if(text.length == 8) {
                        return `<div class="mean__section"><strong>${text}</strong> ${td2.innerText}</div>`;
                    }
                    if (text.includes('.')) {
                        return `<div class="mean__dropdowm">
                                    <strong>${text}</strong> <span>${td2.innerText}</span>
                                </div>` ;
                        }
                    if (td1.querySelector("img")) { 
                       return `<div class="mean__item">
                                    <img  class="mean__img hover-scale" src="${td1.querySelector("img").src.replace(/=w[0-9]{0,4}-h[0-9]{0,4}/g, "")}">
                                    <h5 class="mean__title">${td2.innerText}</h5>
                                </div>`                                 
                    }
                }

                let database = document.createElement('div');
                database.innerHTML = res;
                database.querySelectorAll("a").forEach(el => {
                    el.href = el.href.replace(/https:\/\/www\.google\.com\/url\?q=|&[&a-zA-Z;=0-9\/_-]*/g, '');
                })
                let tabNodes = database.querySelectorAll("#sheet-menu a");
                let tables = database.querySelectorAll('tbody');
                tabNodes.forEach((item, index) => {
                    if (!/[—–−-]/g.test(item.innerText)) {
                        let workObj = {
                            nameTab: item.innerText,
                            data: [],
                        };
                        let trArray = tables[index].querySelectorAll("tr");
                        trArray.forEach((item, i) => {
                            let td = item.querySelectorAll("td");
                            if(i == 0) {
                                workObj.data = [...workObj.data, 
                                      `<div class="mean__class"><strong>${td[0].innerText}</strong> ${td[1].innerText}</div><div class="mean__list">`
                                       ]
                            } else {
                                   workObj.data = [...workObj.data, formedСellСontent(td[0], td[1])]
                            }
                        })
                        tableData.push(workObj)
                    }
                })
                return tableData;
            })
        return result;
    }

    const createPage = async () => {

        const resultData = await getData();

        let template = '';
        resultData.forEach(({data}) => {
            template += `<article class="mean">
            <div class="mean__breadcrumbs">
                <div class="mean__breadcrumb">Класи</div>
                <div class="mean__breadcrumb">Підкласи</div>
                <div class="mean__breadcrumb">Розділи</div>
                <div class="mean__breadcrumb">Підрозділи</div>
            </div>`;
            data.forEach(el => {
                template += el;
            })
            template += '</div></article>'
        })
        block.innerHTML = template;

        const classSummaries = document.querySelectorAll('.mean__class');
        const dropdowmSummaries = document.querySelectorAll('.mean__dropdowm'); 
    
        classSummaries.forEach(el => {
            el.addEventListener('click', ({currentTarget}) => currentTarget.parentNode.classList.toggle('active'))
        })

        dropdowmSummaries.forEach(el => {
            el.addEventListener('click', ({currentTarget}) => {
               let itemArr = getSiblings(currentTarget);
               itemArr.forEach(el => el.classList.toggle('active'));
            })
        })

        function getSiblings(elem) {
            let siblings = [];
            let sibling = elem;

            while (sibling.nextSibling && sibling.nextSibling.matches('.mean__item')) {
                sibling = sibling.nextSibling;
                sibling.nodeType == 1 && siblings.push(sibling);
            }
            return siblings;
        }
    }

  createPage();

