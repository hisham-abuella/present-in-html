# Generates the SVG diagrams spliced into genai-101.html and tech-talk.html (run by ../../build-examples.mjs via python3)
def arrow(x1,y1,x2,y2,cls='dg-line'):
    # straight arrow with a chevron head; horizontal or vertical or diagonal
    import math
    a=math.atan2(y2-y1,x2-x1); L=16
    p1=(x2-L*math.cos(a-0.5),y2-L*math.sin(a-0.5)); p2=(x2-L*math.cos(a+0.5),y2-L*math.sin(a+0.5))
    return f'<path class="{cls}" d="M{x1} {y1}L{x2} {y2}M{p1[0]:.1f} {p1[1]:.1f}L{x2} {y2}L{p2[0]:.1f} {p2[1]:.1f}"/>'
def box(x,y,w,h,title,sub=None,cls='dg-box',ty=None):
    t=f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" rx="6"/>'
    cy=y+h/2
    if sub:
        t+=f'<text class="dg-t" x="{x+w/2}" y="{cy-2}" text-anchor="middle">{title}</text><text class="dg-s" x="{x+w/2}" y="{cy+34}" text-anchor="middle">{sub}</text>'
    else:
        t+=f'<text class="dg-t" x="{x+w/2}" y="{cy+11}" text-anchor="middle">{title}</text>'
    return t
def svg(inner,h,y0=0): return f'<svg viewBox="0 {y0} 1680 {h}" role="img" aria-hidden="true">{inner}</svg>'

def pipe():
    names=[('Text','&ldquo;The cat sat&rdquo;'),('Tokens','464 &middot; 3797 &middot; 3332'),('Embeddings','a point in space'),('Attention','which words matter'),('Next word','a score per word')]
    out=''
    for i,(n,s) in enumerate(names):
        x=i*352; hot=(i==3)
        out+=f'<g data-build="fade" data-order="{i*2+1}">{box(x,150,270,150,n,None,"dg-hot" if hot else "dg-box")}<text class="dg-s" x="{x+135}" y="350" text-anchor="middle">{s}</text></g>'
        if i<4: out+=f'<g data-build="draw" data-order="{i*2+2}">{arrow(x+280,225,x+342,225,"dg-line hot" if hot or i==2 else "dg-line")}</g>'
    return svg(out,300,110)

def emb():
    o='<g data-build="draw" data-order="1"><path class="dg-line" d="M120 560V40M120 560H1100"/></g>'
    pts=[('cat',560,170,1),('kitten',470,235,1),('dog',690,215,1),('car',930,420,0),('truck',1010,350,0),('engine',860,500,0)]
    o+='<g data-build="fade" data-order="2">'
    for n,x,y,h in pts:
        o+=f'<circle class="dg-dot{" hot" if h else ""}" cx="{x}" cy="{y}" r="14"/><text class="dg-t" x="{x+24}" y="{y+11 if n!="kitten" else y+44}">{n}</text>'
    o+='</g>'
    o+=f'<g data-build="draw" data-order="3">{arrow(120,560,545,185,"dg-line hot")}{arrow(120,560,455,250,"dg-line hot")}</g>'
    o+='<g data-build="fade" data-order="4"><text class="dg-b" x="1180" y="230">cat &asymp; kitten</text><text class="dg-s" x="1180" y="272">small angle: close meaning</text><text class="dg-b" x="1180" y="380" style="fill:var(--ink)">cat &ne; truck</text><text class="dg-s" x="1180" y="422">wide angle: unrelated</text></g>'
    return svg(o,600)

def att():
    words='The cat sat on the mat because it was tired'.split()
    xs=[84+168*i for i in range(10)]
    o='<g data-build="fade" data-order="1">'+''.join(f'<text class="dg-t" x="{x}" y="470" text-anchor="middle" style="font-size:38px;font-weight:{650 if i in (1,7) else 450}">{w}</text>' for w,x,i in zip(words,xs,range(10)))+'</g>'
    it=xs[7]
    o+=f'<g data-build="draw" data-order="2"><path class="dg-line hot" style="stroke-width:9" d="M{it} 420C{it} 40 {xs[1]} 40 {xs[1]} 420"/></g>'
    o+=f'<g data-build="draw" data-order="3"><path class="dg-line" style="stroke-width:3" d="M{it} 420C{it} 230 {xs[5]} 230 {xs[5]} 420"/><path class="dg-line" style="stroke-width:3" d="M{it} 420C{it} 300 {xs[9]} 300 {xs[9]} 420"/><path class="dg-line" style="stroke-width:3" d="M{it} 420C{it} 330 {xs[6]} 330 {xs[6]} 420"/></g>'
    o+=f'<g data-build="fade" data-order="4"><text class="dg-b" x="{(it+xs[1])//2}" y="30" text-anchor="middle">&ldquo;it&rdquo; attends to &ldquo;cat&rdquo;</text></g>'
    return svg(o,500)

def arch1():
    o='<g data-build="fade" data-order="1">'+box(0,200,240,130,'Client')+box(420,200,240,130,'API')+box(840,200,300,130,'Postgres','jobs table')+box(1380,200,300,130,'Workers','8 pollers')+'</g>'
    o+=f'<g data-build="draw" data-order="2">{arrow(250,265,410,265)}{arrow(670,265,830,265)}</g>'
    o+=f'<g data-build="draw" data-order="3">{arrow(1370,265,1150,265,"dg-line hot")}</g>'
    o+='<g data-build="fade" data-order="3"><text class="dg-b" x="1260" y="228" text-anchor="middle">poll</text><text class="dg-s" x="1260" y="312" text-anchor="middle">every 100 ms</text></g>'
    o+='<g data-build="fade" data-order="4"><text class="dg-m" x="990" y="400" text-anchor="middle">scans hold row locks</text><text class="dg-m" x="990" y="438" text-anchor="middle">and block each other</text></g>'
    return svg(o,340,150)

def arch2():
    o='<g data-build="fade" data-order="1">'+box(0,200,240,130,'Client')+box(420,200,240,130,'API')
    for k in range(4): o+=f'<rect class="dg-box" x="840" y="{140+k*62}" width="300" height="48" rx="4"/><text class="dg-m" x="990" y="{172+k*62}" text-anchor="middle">partition {k}</text>'
    for k in range(4): o+=f'<rect class="dg-box" x="1440" y="{140+k*62}" width="240" height="48" rx="4"/><text class="dg-s" x="1560" y="{172+k*62}" text-anchor="middle">worker {k}</text>'
    o+='</g>'
    o+=f'<g data-build="draw" data-order="2">{arrow(250,265,410,265)}{arrow(670,265,830,265)}</g>'
    o+='<g data-build="draw" data-order="3" >'+''.join(arrow(1150,164+k*62,1430,164+k*62,"dg-line hot") for k in range(4))+'</g>'
    o+='<g data-build="fade" data-order="4"><text class="dg-b" x="1440" y="432" text-anchor="middle">one lease per lane</text><text class="dg-m" x="990" y="432" text-anchor="middle">SKIP LOCKED</text></g>'
    return svg(o,340,110)
