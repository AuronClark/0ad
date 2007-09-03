/*
 * wxJavaScript - gridszr.h
 *
 * Copyright (c) 2002-2007 Franky Braem and the wxJavaScript project
 *
 * Project Info: http://www.wxjavascript.net or http://wxjs.sourceforge.net
 *
 * This library is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public
 * License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301,
 * USA.
 *
 * $Id: gridszr.h 715 2007-05-18 20:38:04Z fbraem $
 */
#ifndef _WXJSGridSizer_H
#define _WXJSGridSizer_H

namespace wxjs
{
    class Object;

    namespace gui
    {

      class GridSizer : public ApiWrapper<GridSizer, wxGridSizer>
      {
        public:

          static bool GetProperty(wxGridSizer *p, JSContext *cx, JSObject *obj, int id, jsval *vp);
          static bool SetProperty(wxGridSizer *p, JSContext *cx, JSObject *obj, int id, jsval *vp);
          static wxGridSizer* Construct(JSContext *cx,
                                        JSObject *obj,
                                        uintN argc,
                                        jsval *argv,
                                        bool constructing);

            enum
            {
                P_COLS
                , P_ROWS
                , P_HGAP
                , P_VGAP
            };

            WXJS_DECLARE_PROPERTY_MAP()
        };
    }; // namespace gui
}; // namespace wxjs

#endif //_WXJSGridSizer_H
