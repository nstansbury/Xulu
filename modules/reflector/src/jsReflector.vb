'/* ***** BEGIN LICENSE BLOCK *****
'* Version: MPL 1.1/GPL 2.0/LGPL 2.1
'*
'* The contents of this file are subject to the Mozilla Public License Version
'* 1.1 (the "License"); you may not use this file except in compliance with
'* the License. You may obtain a copy of the License at
'* http://www.mozilla.org/MPL/
'*
'* Software distributed under the License is distributed on an "AS IS" basis,
'* WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
'* for the specific language governing rights and limitations under the
'* License.
'*
'* The Original Code is the Xulu Javascript Exporter.
'*
'* The Initial Developer of the Original Code is
'* Neil Stansbury <neil@neilstansbury.com>.
'* Portions created by the Initial Developer are Copyright (C) 2009
'* the Initial Developer. All Rights Reserved.
'*
'* Contributor(s):
'*
'* Alternatively, the contents of this file may be used under the terms of
'* either the GNU General Public License Version 2 or later (the "GPL"), or
'* the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
'* in which case the provisions of the GPL or the LGPL are applicable instead
'* of those above. If you wish to allow use of your version of this file only
'* under the terms of either the GPL or the LGPL, and not to allow others to
'* use your version of this file under the terms of the MPL, indicate your
'* decision by deleting the provisions above and replace them with the notice
'* and other provisions required by the GPL or the LGPL. If you do not delete
'* the provisions above, a recipient may use your version of this file under
'* the terms of any one of the MPL, the GPL or the LGPL.
'*
'* ***** END LICENSE BLOCK ***** */
Imports Reflector
Imports Reflector.CodeModel


Public Class JSReflector
    Implements Reflector.IPackage

    Private assemblyManager As IAssemblyManager
    Private assemblyBrowser As IAssemblyBrowser
    Private commandBarManager As ICommandBarManager
    Private exportSeparator As ICommandBarSeparator
    Private exportButton As ICommandBarButton

    Private Const JS_OBJECT_DEF As String = "{" + vbCrLf + vbTab + vbTab + "throw new NotImplementedException( arguments.callee.name );" + vbCrLf + vbTab + "}," + vbCrLf

    Public Sub Load(ByVal serviceProvider As System.IServiceProvider) Implements IPackage.Load
        assemblyBrowser = CType(serviceProvider.GetService(GetType(IAssemblyBrowser)), IAssemblyBrowser)
        assemblyManager = CType(serviceProvider.GetService(GetType(IAssemblyManager)), IAssemblyManager)

        commandBarManager = CType(serviceProvider.GetService(GetType(ICommandBarManager)), ICommandBarManager)
        exportSeparator = commandBarManager.CommandBars.Item("Browser.TypeDeclaration").Items.AddSeparator()
        exportButton = commandBarManager.CommandBars.Item("Browser.TypeDeclaration").Items.AddButton("Export Type as Javascript", AddressOf ExportButton_click)
    End Sub
    Public Sub Unload() Implements IPackage.Unload
        commandBarManager.CommandBars.Item("Browser.TypeDeclaration").Items.Remove(exportSeparator)
        commandBarManager.CommandBars.Item("Browser.TypeDeclaration").Items.Remove(exportButton)
    End Sub
    Private Sub ExportButton_click(ByVal sender As Object, ByVal e As System.EventArgs)

        Dim item As ITypeDeclaration = CType(assemblyBrowser.ActiveItem, ITypeDeclaration)


        Dim jsDef As System.Text.StringBuilder = New System.Text.StringBuilder()

        Dim jsOutput As String

        Dim method As IMethodDeclaration
        Dim prop As IPropertyDeclaration

        For Each prop In item.Properties

            If Not prop.GetMethod Is Nothing Then
                If CType(prop.GetMethod, IMethodDeclaration).Visibility = MethodVisibility.Public Then
                    jsDef.Append(jsProtoGetter(prop))
                End If
            End If

            If Not prop.SetMethod Is Nothing Then
                If CType(prop.SetMethod, IMethodDeclaration).Visibility = MethodVisibility.Public Then
                    jsDef.Append(jsProtoSetter(prop))
                End If
            End If

        Next

        For Each method In item.Methods
            If Not method.SpecialName And method.Visibility = MethodVisibility.Public Then
                jsDef.Append(jsProtoMethod(method))
            End If
        Next

        If item.Abstract Or item.Interface Or item.Sealed Then
            jsDef.Insert(1, jsProtoConstructor(item.Name, True))
            jsOutput = " = {" + vbCrLf + jsDef.ToString() + vbCrLf + "}"
            jsOutput = item.Name + jsOutput
        Else
            jsDef.Insert(1, jsProtoConstructor(item.Name, False))
            jsOutput = " = {" + vbCrLf + jsDef.ToString() + vbCrLf + "}"
            jsOutput = item.Name + ".prototype" + jsOutput
            jsOutput = "function " + item.Name + "(){};" + vbCrLf + jsOutput
        End If

        Dim base As String = ""
        If item.Interface Then
            Dim iface As ITypeReference
            For Each iface In item.Interfaces
                base += iface.Name + ", "
            Next
        Else
            base = item.BaseType.Name
        End If

        jsOutput = "//** @base{" + base + "}" + vbCrLf + jsOutput

        Dim cdlg As System.Windows.Forms.SaveFileDialog = New System.Windows.Forms.SaveFileDialog
        Dim result As Windows.Forms.DialogResult

        cdlg.Title = "Save Type..."
        cdlg.Filter = "Javascript files (*.js)|*.js|All files (*.*)|*.*"
        cdlg.DefaultExt = "js"
        cdlg.FileName = item.Namespace + "." + item.Name
        result = cdlg.ShowDialog()
        If result = Windows.Forms.DialogResult.OK Then
            System.IO.File.WriteAllText(cdlg.FileName, jsOutput)
        End If


    End Sub
    Private Function jsProtoMethod(ByRef method As IMethodDeclaration) As String
        Dim param As IParameterDeclaration
        Dim params As String = vbNullString
        Dim jsDef As String = vbCrLf
        If Not method.Documentation Is vbNullString Then
            jsDef += vbTab + "/** " + vbCrLf + method.Documentation + vbCrLf + vbTab + "**/" + vbCrLf
        End If
        If method.Static = True Then
            jsDef += vbTab + "//** @static" + vbCrLf
        End If
        For Each param In method.Parameters
            Try
                jsDef += vbTab + "//** @param{" + CType(param.ParameterType, ITypeReference).Name + "} " + param.Name + vbCrLf
            Catch
                jsDef += vbTab + "//** @param{Array} " + param.Name + vbCrLf
            End Try
            If Not params = vbNullString Then
                params += ", "
            End If
            params += param.Name
        Next
        If Not method.ReturnType.Type Is Nothing Then
            Try
                jsDef += vbTab + "//** @returns{" + CType(method.ReturnType.Type, ITypeReference).Name + "}" + vbCrLf
            Catch
                jsDef += vbTab + "//** @returns{Array}" + vbCrLf
            End Try
        End If
        Return jsDef + vbTab + method.Name + " : function( " + params + " )" + JS_OBJECT_DEF
    End Function
    Private Function jsProtoGetter(ByRef prop As IPropertyDeclaration) As String
        Dim jsDef As String = vbCrLf
        If Not prop.Documentation Is vbNullString Then
            jsDef += vbTab + "/** " + vbCrLf + prop.Documentation + vbCrLf + vbTab + "**/" + vbCrLf
        End If
        Try
            jsDef += vbTab + "//** @returns{" + CType(prop.PropertyType, ITypeReference).Name + "}" + vbCrLf
        Catch
            jsDef += vbTab + "//** @returns{Array}" + vbCrLf
        End Try
        Return jsDef + vbTab + "get " + prop.Name + "()" + JS_OBJECT_DEF
    End Function
    Private Function jsProtoSetter(ByRef prop As IPropertyDeclaration) As String
        Dim jsDef As String = vbCrLf
        If Not prop.Documentation Is vbNullString Then
            jsDef += "/** " + vbCrLf + prop.Documentation + vbCrLf + "**/" + vbTab + vbCrLf
        End If
        Try
            jsDef += vbTab + "//** @param{" + CType(prop.PropertyType, ITypeReference).Name + "} value" + vbCrLf
        Catch
            jsDef += vbTab + "//** @param{Array} value" + vbCrLf
        End Try
        Return jsDef + vbTab + "set " + prop.Name + "( value )" + JS_OBJECT_DEF
    End Function
    Private Function jsProtoConstructor(ByVal type As String, ByVal isConstructor As Boolean) As String
        Dim jsDef As String = vbCrLf
        jsDef += vbTab + "//** @returns{" + type + "}" + vbCrLf
        If Not isConstructor Then
            Return jsDef + vbTab + "constructor : " + type + "," + vbCrLf + vbCrLf
        Else
            Return jsDef + vbTab + "constructor : function " + type + "()" + JS_OBJECT_DEF
        End If
    End Function
    Private Function jsObject(ByVal objectName As String) As String
        Return objectName + " = {};"
    End Function
End Class
