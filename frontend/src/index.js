import { opine, serveStatic } from 'https://deno.land/x/opine@0.12.0/mod.ts';
import { renderFileToString } from 'https://deno.land/x/dejs@0.7.0/mod.ts';
import { join, dirname } from 'https://deno.land/x/opine@main/deps.ts';


const app = opine();
const __dirname = dirname(import.meta.url);

app.engine('.html', renderFileToString);
app.use(serveStatic(join(__dirname, 'public')));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index', { title: 'Deno Sample' });
});

app.listen(3000);
console.log('running on port 3000');