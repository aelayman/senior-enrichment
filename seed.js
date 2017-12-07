const { db, Campus, Student } = require('./server/db/models');


const campuses = [{
    name: "S.S. Tunis",
    imageUrl: "https://i.imgur.com/AxH69n9.jpg",
    description: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda."
    }, {
    name: "S.S. Cartegena",
    imageUrl: "https://i.imgur.com/AxH69n9.jpg",
    description: "Quieren decir que tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad."
    }, {
    name: "S.S. Cadiz",
    imageUrl: "https://i.imgur.com/AxH69n9.jpg",
    description: "Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba ocioso (que eran los más del año) se daba a leer libros de caballerías con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de la caza, y aun la administración de su hacienda; y llegó a tanto su curiosidad y desatino en esto, que vendió muchas hanegas de tierra de sembradura, para comprar libros de caballerías en que leer; y así llevó a su casa todos cuantos pudo haber dellos; y de todos ningunos le parecían tan bien como los que compuso el famoso Feliciano de Silva: porque la claridad de su prosa, y aquellas intrincadas razones suyas, le parecían de perlas; y más cuando llegaba a leer aquellos requiebros y cartas de desafío, donde en muchas partes hallaba escrito"
    }, {
    name: "S.S. Catania",
    imageUrl: "https://i.imgur.com/AxH69n9.jpg",
    description: "Tuvo muchas veces competencia con el cura de su lugar (que era hombre docto graduado en Sigüenza), sobre cuál había sido mejor caballero, Palmerín de Inglaterra o Amadís de Gaula; mas maese Nicolás, barbero del mismo pueblo, decía que ninguno llegaba al caballero del Febo, y que si alguno se le podía comparar, era don Galaor, hermano de Amadís de Gaula, porque tenía muy acomodada condición para todo; que no era caballero melindroso, ni tan llorón como su hermano, y que en lo de la valentía no le iba en zaga."
    }, {
    name: "S.S. Coatzacoalcos",
    imageUrl: "https://i.imgur.com/AxH69n9.jpg",
    description: "En resolución, él se enfrascó tanto en su lectura, que se le pasaban las noches leyendo de claro en claro, y los días de turbio en turbio, y así, del poco dormir y del mucho leer, se le secó el cerebro, de manera que vino a perder el juicio. Llenósele la fantasía de todo aquello que leía en los libros, así de encantamientos, como de pendencias, batallas, desafíos, heridas, requiebros, amores, tormentas y disparates imposibles, y asentósele de tal modo en la imaginación que era verdad toda aquella máquina de aquellas soñadas invenciones que leía, que para él no había otra historia más cierta en el mundo."
    }, {
    name: "S.S. Nuuk",
    imageUrl: "https://i.imgur.com/AxH69n9.jpg",
    description: "Decía él, que el Cid Ruy Díaz había sido muy buen caballero; pero que no tenía que ver con el caballero de la ardiente espada, que de sólo un revés había partido por medio dos fieros y descomunales gigantes. Mejor estaba con Bernardo del Carpio, porque en Roncesvalle había muerto a Roldán el encantado, valiéndose de la industria de Hércules, cuando ahogó a Anteo, el hijo de la Tierra, entre los brazos."
    }
];

const students = [{
    firstName: "Alex",
    lastName: "Cartmell",
    email: "alex@cartmell.com",
    gpa: 2.5,
    campusId: 5
    }, {    
    firstName: "Diana",
    lastName: "Aberizk",
    email: "diana@aberizk.com",
    gpa: 3.0,
    campusId: 6
    }, {    
    firstName: "Tony",
    lastName: "Hall",
    email: "tony@hall.com",
    gpa: 3.5,
    campusId: 2
    }, {   
    firstName: "Jasmine",
    lastName: "Gil",
    email: "jasmine@gil.com",
    gpa: 4.0,
    campusId: 1
    }, {     
    firstName: "Libby",
    lastName: "Anderson",
    email: "libby@anderson.com",
    gpa: 1.5,
    campusId: 4
    }, {
    firstName: "Zara",
    lastName: "Layman",
    email: "zara@layman.com",
    gpa: 1.0,
    campusId: 5
    }, {     
    firstName: "Nick",
    lastName: "Viglione",
    email: "nick@viglione.com",
    gpa: 2.0,
    campusId: 1

    }, {    
    firstName: "Charlie",
    lastName: "Dickey",
    email: "charlie@dickey.com",
    gpa: 0.5,
    campusId: 2
    }
];

const seed = () =>
Promise.all(campuses.map(campus =>
  Campus.create(campus))
)
.then(() =>
Promise.all(students.map(student =>
  Student.create(student))
));


const main = () => {
    console.log("Syncing db...");
    db.sync({force: true})
        .then(() => {
            console.log("Seeding the database...");
            return seed();
        })
        .catch(error => {
            console.log("Error while seeding");
            console.log(error.stack);
        })
        .then(() => {
            db.close();
            return null;
        });
};

main();
